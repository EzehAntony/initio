'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Data } from "@/lib/data";
import { useState } from "react";
import { Download, Globe, Shield, Zap, Check, AlertCircle, Loader2 } from "lucide-react";

interface DownloadState {
    isDownloading: boolean;
    error: string | null;
    success: boolean;
}

const Page = (): React.ReactElement => {
    const [ url, setUrl ] = useState( '' );
    const [ state, setState ] = useState<DownloadState>( {
        isDownloading: false,
        error: null,
        success: false,
    } );



    const detectPlatform = ( url: string ): string => {
        if ( url.includes( 'youtube.com' ) || url.includes( 'youtu.be' ) ) {
            return 'YouTube';
        } else if ( url.includes( 'instagram.com' ) ) {
            return 'Instagram';
        } else if ( url.includes( 'twitter.com' ) || url.includes( 'x.com' ) ) {
            return 'Twitter';
        } else if ( url.includes( 'tiktok.com' ) ) {
            return 'TikTok';
        } else if ( url.includes( 'facebook.com' ) || url.includes( 'fb.watch' ) ) {
            return 'Facebook';
        } else if ( url.includes( 'linkedin.com' ) ) {
            return 'LinkedIn';
        } else if ( url.includes( 'reddit.com' ) ) {
            return 'Reddit';
        } else if ( url.includes( 'vimeo.com' ) ) {
            return 'Vimeo';
        }
        return 'Unknown';
    };

    const handleDownload = async () => {
        if ( !url.trim() ) {
            setState( prev => ( { ...prev, error: 'Please enter a valid URL' } ) );
            return;
        }

        setState( {
            isDownloading: true,
            error: null,
            success: false,
        } );

        try {
            const response = await fetch( '/api/download-video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { url } ),
            } );

            if ( !response.ok ) {
                const errorText = await response.text();
                let errorMessage = 'Download failed';

                try {
                    const errorData = JSON.parse( errorText );
                    errorMessage = errorData.error || errorMessage;
                } catch {
                    errorMessage = `Server error: ${ response.status }`;
                }

                throw new Error( errorMessage );
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL( blob );
            const link = document.createElement( 'a' );
            link.href = downloadUrl;

            const contentDisposition = response.headers.get( 'Content-Disposition' );
            const filename = contentDisposition
                ? contentDisposition.split( 'filename=' )[ 1 ]?.replace( /"/g, '' )
                : `video_${ Date.now() }.mp4`;

            link.download = filename;
            document.body.appendChild( link );
            link.click();
            document.body.removeChild( link );
            window.URL.revokeObjectURL( downloadUrl );

            setState( prev => ( {
                ...prev,
                isDownloading: false,
                success: true,
            } ) );

            setTimeout( () => {
                setState( prev => ( { ...prev, success: false } ) );
                setUrl( '' );
            }, 3000 );

        } catch ( error ) {
            setState( prev => ( {
                ...prev,
                isDownloading: false,
                error: error instanceof Error ? error.message : 'An error occurred',
            } ) );
        }
    };

    const currentPlatform = url ? detectPlatform( url ) : null;

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */ }
            <div className="relative overflow-hidden">
                {/* Subtle Background Effects */ }
                <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px]" />
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 py-8">
                    {/* Header */ }
                    <div className="flex items-center justify-between mb-16">
                        <Image alt="logo" src="/logo.png" width={ 60 } height={ 60 } className="rounded-xl" />
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm rounded-full border border-white/[0.08]">
                            <Shield className="w-4 h-4 text-green-400" />
                            <span className="text-white text-sm font-medium">100% Safe & Secure</span>
                        </div>
                    </div>

                    {/* Main Content */ }
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-8">
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                Download Videos
                                <span className="block text-white">
                                    Instantly
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                                Fast, free, and secure video downloader supporting all major platforms.
                                No registration required, no watermarks.
                            </p>
                        </div>

                        {/* Download Form */ }
                        <div className="mb-12">
                            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
                                <div className="relative flex-1">
                                    <Input
                                        placeholder="Paste video URL here..."
                                        value={ url }
                                        onChange={ ( e ) => setUrl( e.target.value ) }
                                        disabled={ state.isDownloading }
                                        onKeyDown={ ( e ) => {
                                            if ( e.key === 'Enter' && !state.isDownloading && url.trim() ) {
                                                handleDownload();
                                            }
                                        } }
                                        className="h-14 px-6 bg-white/[0.05] backdrop-blur-sm border-white/[0.08] text-white placeholder:text-gray-500 rounded-2xl focus:ring-2 focus:ring-white focus:border-white transition-all duration-300"
                                    />
                                    <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                </div>
                                <Button
                                    onClick={ handleDownload }
                                    disabled={ state.isDownloading || !url.trim() }
                                    className="h-14 px-8 bg-white text-black hover:bg-gray-200 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                                >
                                    { state.isDownloading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Downloading...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Download className="w-5 h-5" />
                                            <span>Download</span>
                                        </div>
                                    ) }
                                </Button>
                            </div>

                            {/* Status Messages */ }
                            { url && currentPlatform && currentPlatform !== 'Unknown' && (
                                <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
                                    <Check className="w-4 h-4" />
                                    <span className="text-sm font-medium">{ currentPlatform } link detected</span>
                                </div>
                            ) }

                            { url && currentPlatform === 'Unknown' && (
                                <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">Platform not recognized - download may not work</span>
                                </div>
                            ) }

                            { state.error && (
                                <div className="max-w-md mx-auto p-4 bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl">
                                    <div className="flex items-center gap-2 text-red-400">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm">{ state.error }</span>
                                    </div>
                                </div>
                            ) }

                            { state.success && (
                                <div className="max-w-md mx-auto p-4 bg-green-900/20 backdrop-blur-sm border border-green-500/30 rounded-xl">
                                    <div className="flex items-center gap-2 text-green-400">
                                        <Check className="w-4 h-4" />
                                        <span className="text-sm font-medium">Video downloaded successfully!</span>
                                    </div>
                                </div>
                            ) }

                            { state.isDownloading && (
                                <div className="max-w-md mx-auto">
                                    <div className="h-2 bg-white/[0.1] rounded-full overflow-hidden">
                                        <div className="h-full bg-white rounded-full animate-pulse" />
                                    </div>
                                </div>
                            ) }
                        </div>


                    </div>
                </div>
            </div>

            {/* Features Section */ }
            <div className="py-20 bg-gray-950/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our Downloader?</h2>
                        <p className="text-gray-400 text-lg">Fast, secure, and completely free video downloading</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300">
                            <div className="w-16 h-16 bg-white/[0.05] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
                            <p className="text-gray-400">Download videos in seconds with our optimized servers and advanced compression technology.</p>
                        </div>

                        <div className="text-center p-8 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300">
                            <div className="w-16 h-16 bg-white/[0.05] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">100% Secure</h3>
                            <p className="text-gray-400">Your privacy is our priority. No data stored, no tracking, completely anonymous downloads.</p>
                        </div>

                        <div className="text-center p-8 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300">
                            <div className="w-16 h-16 bg-white/[0.05] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Multiple Platforms</h3>
                            <p className="text-gray-400">Support for all major video platforms with high-quality downloads up to 4K resolution.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */ }
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        { [
                            { number: '2.5M+', label: 'Videos Downloaded' },
                            { number: '500K+', label: 'Happy Users' },
                            { number: '15+', label: 'Platforms Supported' },
                            { number: '99.9%', label: 'Uptime' }
                        ].map( ( stat, index ) => (
                            <div key={ index } className="text-center p-6 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl hover:bg-white/[0.03] transition-all duration-300">
                                <div className="text-4xl font-bold text-white mb-2">
                                    { stat.number }
                                </div>
                                <div className="text-gray-400 font-medium">{ stat.label }</div>
                            </div>
                        ) ) }
                    </div>
                </div>
            </div>

            {/* How It Works */ }
            <div className="py-20 bg-gray-950/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-gray-400 text-lg">Simple 3-step process to download any video</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        { [
                            { step: '1', title: 'Copy URL', description: 'Copy the video link from any supported platform' },
                            { step: '2', title: 'Paste & Click', description: 'Paste the URL and hit the download button' },
                            { step: '3', title: 'Download', description: 'Get your video in the highest available quality' }
                        ].map( ( item, index ) => (
                            <div key={ index } className="text-center relative">
                                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <span className="text-2xl font-bold text-black">{ item.step }</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">{ item.title }</h3>
                                <p className="text-gray-400">{ item.description }</p>
                                { index < 2 && (
                                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-white/[0.1] transform -translate-x-1/2" />
                                ) }
                            </div>
                        ) ) }
                    </div>
                </div>
            </div>

            {/* FAQ Section */ }
            <div className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-400 text-lg">Everything you need to know about our video downloader</p>
                    </div>

                    <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl p-6">
                        <Accordion type="single" collapsible className="w-full" defaultValue="0">
                            { Data.faq.map( ( faqItem, index ) => (
                                <AccordionItem
                                    key={ index }
                                    value={ `${ index }` }
                                    className="border-b border-white/[0.05] last:border-b-0"
                                >
                                    <AccordionTrigger className="text-white hover:text-gray-300 font-semibold py-6 hover:no-underline transition-colors duration-200">
                                        { faqItem.title }
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-400 pb-6">
                                        { faqItem.content.map( ( content, contentIndex ) => (
                                            <p key={ contentIndex } className="mb-3 last:mb-0">{ content }</p>
                                        ) ) }
                                    </AccordionContent>
                                </AccordionItem>
                            ) ) }
                        </Accordion>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Page;