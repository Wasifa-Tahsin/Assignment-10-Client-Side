import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer class="bg-indigo-200 text-black py-8">
  <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    
    <div class="text-center md:text-left mb-4 md:mb-0">
      <h2 class="text-3xl font-bold">Chill Gamer</h2>
      <p class="text-black mt-2">Your go-to place for honest game reviews!</p>
    </div>

    
    <div class="text-center">
      <h3 class="text-xl font-semibold">Follow Us</h3>
      <div class="flex justify-center space-x-6 mt-2">
        <a href="https://facebook.com" target="_blank" class="text-black hover:text-yellow-400">Facebook</a>
        <a href="https://twitter.com" target="_blank" class="text-black hover:text-yellow-400">Twitter</a>
        <a href="https://instagram.com" target="_blank" class="text-black hover:text-yellow-400">Instagram</a>
        <a href="https://youtube.com" target="_blank" class="text-black hover:text-yellow-400">YouTube</a>
      </div>
      <p class="text-black mt-4">&copy; 2024 Chill Gamer. All rights reserved by Afia.</p>
    </div>
  </div>
</footer>
        </div>
    );
};

export default Footer;
