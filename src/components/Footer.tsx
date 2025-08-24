import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-[#111111] border-t border-[#333333] mt-16">
            <div className="max-w-[1200px] mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */ }
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image src="/logo.png" alt="Initio" width={ 40 } height={ 40 } />
                            <span className="text-white text-xl font-bold">Initio</span>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md">
                            The ultimate web stalker for downloading videos from any social media platform.
                            Fast, free, and secure - download videos in the highest quality available.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                                <span className="text-white text-xs font-bold">f</span>
                            </div>
                            <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                                <span className="text-white text-xs font-bold">t</span>
                            </div>
                            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                                <span className="text-white text-xs font-bold">y</span>
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                                <span className="text-white text-xs font-bold">i</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */ }
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">How It Works</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">Supported Sites</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Support */ }
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">DMCA</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">Report Bug</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#D76EF3] transition-colors">API Access</a></li>
                        </ul>
                    </div>
                </div>

                {/* Popular Platforms */ }
                <div className="mt-12 pt-8 border-t border-[#333333]">
                    <h3 className="text-white font-semibold mb-6 text-center">Supported Platforms</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        { [
                            'YouTube', 'TikTok', 'Instagram', 'Facebook', 'Twitter', 'Vimeo',
                            'Dailymotion', 'Twitch', 'LinkedIn', 'Pinterest', 'Snapchat', 'Reddit',
                            'Tumblr', 'SoundCloud', 'Spotify'
                        ].map( ( platform ) => (
                            <span key={ platform } className="text-gray-400 text-sm hover:text-[#D76EF3] cursor-pointer transition-colors">
                                { platform }
                            </span>
                        ) ) }
                    </div>
                </div>

                {/* Bottom Section */ }
                <div className="mt-12 pt-8 border-t border-[#333333] flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2024 Initio. All rights reserved. Made with ❤️ for video enthusiasts.
                    </div>
                    <div className="flex gap-6 text-sm">
                        <span className="text-gray-400">🔒 Secure Downloads</span>
                        <span className="text-gray-400">⚡ Lightning Fast</span>
                        <span className="text-gray-400">🆓 Always Free</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 