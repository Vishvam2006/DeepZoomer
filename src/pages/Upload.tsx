import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload as UploadIcon, X, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      toast.success("Image loaded successfully!");
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
      toast.success("Image loaded successfully!");
    } else {
      toast.error("Please drop an image file");
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleProcess = () => {
    if (!file) return;
    
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            toast.success("Image processed successfully!");
            navigate(`/viewer?image=${encodeURIComponent(preview)}`);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview("");
    setUploadProgress(0);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-nebula opacity-30" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Upload Your Image
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload a high-resolution image to explore in infinite detail
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {!file ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center hover:border-primary/60 transition-all duration-300 bg-card/50 backdrop-blur-sm"
            >
              <UploadIcon className="w-20 h-20 text-primary mx-auto mb-6 animate-float" />
              
              <h3 className="text-2xl font-semibold mb-4">
                Drag & drop your image here
              </h3>
              
              <p className="text-muted-foreground mb-6">
                or click to browse your files
              </p>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              
              <label htmlFor="file-upload">
                <Button variant="default" className="cursor-pointer" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              
              <p className="text-sm text-muted-foreground mt-6">
                Supports: JPG, PNG, TIFF • Max size: 100MB
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-cosmic">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-[500px] object-contain bg-muted"
                />
                
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={handleRemove}
                  disabled={isProcessing}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-lg">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  {uploadProgress === 100 && (
                    <div className="flex items-center gap-2 text-primary">
                      <Check className="w-5 h-5" />
                      <span>Ready</span>
                    </div>
                  )}
                </div>
                
                {isProcessing && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Processing image tiles...
                      </span>
                      <span className="text-sm font-semibold">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-cosmic"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
                
                <Button
                  variant="default"
                  className="w-full"
                  onClick={handleProcess}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="mr-2" />
                      Process & Explore
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
