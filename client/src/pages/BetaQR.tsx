import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import logoImage from "@assets/Gemini_Generated_Image_tdfaqktdfaqktdfa_1759614147704.png";

export default function BetaQR() {
  const appUrl = window.location.origin;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(appUrl)}`;
  
  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'scrubbable-beta-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(appUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 flex items-center justify-center">
      <Card className="max-w-lg w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logoImage} alt="Scrubbable" className="h-32" />
          </div>
          <h2 className="text-xl font-semibold text-muted-foreground">Beta Testing</h2>
          <p className="text-muted-foreground">
            Scan this QR code to test the app on your mobile device
          </p>
        </div>

        <div className="flex justify-center p-6 bg-white dark:bg-gray-800 rounded-lg">
          <img 
            src={qrCodeUrl}
            alt="Beta Test QR Code"
            className="w-80 h-80"
            data-testid="img-qr-code"
          />
        </div>

        <div className="space-y-3">
          <Button 
            onClick={downloadQR} 
            className="w-full"
            data-testid="button-download-qr"
          >
            <Download className="h-4 w-4 mr-2" />
            Download QR Code
          </Button>
          
          <Button 
            onClick={copyUrl} 
            variant="outline" 
            className="w-full"
            data-testid="button-copy-url"
          >
            Copy App URL
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground break-all">
            {appUrl}
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <h3 className="font-semibold text-sm">Beta Test Features:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 200+ surgical procedures with complete details</li>
            <li>• 232+ instruments with images and setup tips</li>
            <li>• Case-insensitive instrument search</li>
            <li>• Mobile-optimized glassmorphism design</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
