import 'package:flutter/material.dart';

class AboutUsPage extends StatelessWidget {
  const AboutUsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(30.0),
        child: Column(
          children: [
            const Text(
              'About US',
              style: TextStyle(fontSize: 32, color: Colors.white),
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Top: Logo
                Container(
                  width: 100,
                  height: 100,
                  decoration: const BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/logo.png'),
                      fit: BoxFit.cover,
                    ),
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(height: 16),

                // Middle: Short Description
                const Text(
                  'Passport Pals, a mobile application is a highly dedicated platform for travel bloggers to share their adventures and travel stories. Empowering travel bloggers, Passport Pals offers a seamless blogging experience. It is an android application which will feature a user-friendly interface that allows users to create profiles, post their travel blogs and engage with other users to share travel tips and recommendations.',
                  style: TextStyle(fontSize: 16, color: Colors.white),
                  textAlign: TextAlign.justify,
                ),
                const SizedBox(height: 32),

                // Bottom: Developer Information
                const CircleAvatar(
                  radius: 50,
                  backgroundImage: AssetImage(
                      'assets/images/profile.png'), // Replace with developer's avatar
                ),

                const SizedBox(height: 8),
                const Text(
                  'Designed and Developed by:',
                  style: TextStyle(fontSize: 16, color: Colors.grey),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Siddhartha Shakya',
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
                const SizedBox(height: 8),
                const Text(
                  'siddharthashakya21@gmail.com',
                  style: TextStyle(fontSize: 16, color: Colors.grey),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
