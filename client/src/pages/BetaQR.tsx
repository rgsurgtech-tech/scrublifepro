import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, CheckCircle, Smartphone, Shield, Zap } from "lucide-react";
import logoImage from "@assets/20251005_173733_1759700304560.jpg";

export default function BetaQR() {
  const appUrl = window.location.origin;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(appUrl)}`;
  const [copied, setCopied] = useState(false);
  
  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'scrub-life-pro-beta.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Surgical gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-blue-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="max-w-5xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
                <img 
                  src={logoImage} 
                  alt="Scrub Life Pro" 
                  className="h-40 w-40 relative z-10 rounded-full border-4 border-cyan-400/30"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              SCRUB LIFE PRO
            </h1>
            <p className="text-xl text-cyan-200 mb-2">Beta Testing Program</p>
            <p className="text-cyan-100/80 max-w-2xl mx-auto">
              Join our exclusive beta testing community and get early access to the most comprehensive surgical technology platform
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* QR Code Card */}
            <Card className="p-8 bg-white/10 backdrop-blur-xl border-cyan-400/30">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="bg-white p-6 rounded-2xl shadow-2xl">
                    <img 
                      src={qrCodeUrl}
                      alt="Beta Test QR Code"
                      className="w-64 h-64"
                      data-testid="img-qr-code"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={downloadQR} 
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    data-testid="button-download-qr"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                  
                  <Button 
                    onClick={copyUrl} 
                    variant="outline" 
                    className="w-full border-cyan-400/50 text-white hover:bg-cyan-500/20"
                    data-testid="button-copy-url"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy URL
                      </>
                    )}
                  </Button>
                </div>

                <div className="pt-4 border-t border-cyan-400/20">
                  <p className="text-xs text-cyan-100/60 break-all">
                    {appUrl}
                  </p>
                </div>
              </div>
            </Card>

            {/* Instructions Card */}
            <Card className="p-8 bg-white/10 backdrop-blur-xl border-cyan-400/30 h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Smartphone className="h-6 w-6 text-cyan-400" />
                    How to Join Beta
                  </h3>
                  <ol className="space-y-3 text-cyan-100/90">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold">1</span>
                      <span>Open your phone's camera app</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold">2</span>
                      <span>Point at the QR code to scan</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold">3</span>
                      <span>Tap the notification to open the app</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold">4</span>
                      <span>Create your account and start exploring</span>
                    </li>
                  </ol>
                </div>

                <div className="pt-6 border-t border-cyan-400/20">
                  <h4 className="text-lg font-semibold text-white mb-3">Beta Features:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 text-cyan-100/80">
                      <Shield className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">200+ surgical procedures with complete step-by-step guides</span>
                    </div>
                    <div className="flex items-start gap-3 text-cyan-100/80">
                      <Zap className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">500+ instruments with high-res images and setup tips</span>
                    </div>
                    <div className="flex items-start gap-3 text-cyan-100/80">
                      <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mobile-optimized glassmorphism interface</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 bg-cyan-500/10 -mx-8 px-8 -mb-8 pb-8 rounded-b-xl">
                  <p className="text-sm text-cyan-100/70 text-center">
                    Questions? Contact us at <span className="text-cyan-400 font-medium">support@scrubbable.com</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
