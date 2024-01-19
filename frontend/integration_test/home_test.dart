import 'package:dartz/dartz.dart';
import 'package:final_mobile/config/router/app_route.dart';
import 'package:final_mobile/config/theme/app_theme.dart';
import 'package:final_mobile/features/home/domain/entity/home_entity.dart';
import 'package:final_mobile/features/home/domain/use_case/home_use_case.dart';
import 'package:final_mobile/features/home/presentation/viewmodel/home_view_model.dart';
import 'package:final_mobile/features/profile/domain/entity/profile_entity.dart';
import 'package:final_mobile/features/profile/domain/usecase/profile_use_case.dart';
import 'package:final_mobile/features/profile/presentation/viewmodel/profile_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:mockito/mockito.dart';

import '../test/unit_test/home_test.mocks.dart';
import '../test_data/home_entity_test.dart';
import '../test_data/profile_entity_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  TestWidgetsFlutterBinding.ensureInitialized();
  late HomeUseCase mockHomeUseCase;
  late ProfileUseCase mockProfileUsecase;
  late List<HomeEntity> homeEntity;
  late List<ProfileEntity> profileEntity;
  late List<HomeEntity> bookMarkedBlogs;
  late List<HomeEntity> userBlogs;

  setUpAll(() async {
    mockHomeUseCase = MockHomeUseCase();
    homeEntity = await getBlogListTest();
    mockProfileUsecase = MockProfileUseCase();
    profileEntity = await getAllProfile();
    bookMarkedBlogs = await getBookmarkedBlogs();
    userBlogs = await getUserBlogs();
  });

  testWidgets('Homepage Rendering', (tester) async {
    when(mockHomeUseCase.getAllBlogs())
        .thenAnswer((_) async => Right(homeEntity));
    when(mockHomeUseCase.getBookmarkedBlogs())
        .thenAnswer((_) async => Right(bookMarkedBlogs));
    when(mockHomeUseCase.getUserBlogs())
        .thenAnswer((_) async => Right(userBlogs));
    when(mockProfileUsecase.getAllProfile())
        .thenAnswer((_) async => Right(profileEntity));

    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          homeViewModelProvider
              .overrideWith((ref) => HomeViewModel(mockHomeUseCase)),
          profileViewModelProvider
              .overrideWith((ref) => ProfileViewModel(mockProfileUsecase)),
        ],
        child: MaterialApp(
          routes: AppRoute.getApplicationRoute(),
          initialRoute: AppRoute.homeRoute,
          debugShowCheckedModeBanner: false,
          theme: AppTheme.getApplicationTheme(),
        ),
      ),
    );

    await tester.pumpAndSettle();

    expect(find.text('Blogs'), findsOneWidget);

    expect(find.byType(ListView), findsOneWidget);
  });
}
