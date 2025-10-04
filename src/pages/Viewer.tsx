import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize, Home, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import OpenSeadragon from "openseadragon";

const Viewer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<OpenSeadragon.Viewer | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageUrl = searchParams.get("image");

  useEffect(() => {
    if (!viewerRef.current || !imageUrl) return;

    const osdViewer = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@4.1/build/openseadragon/images/",
      tileSources: {
        type: 'image',
        url: imageUrl,
        buildPyramid: true,
      },
      animationTime: 0.5,
      blendTime: 0.1,
      constrainDuringPan: false,
      maxZoomPixelRatio: 2,
      minZoomLevel: 0.8,
      visibilityRatio: 1,
      zoomPerScroll: 1.2,
      showNavigator: true,
      navigatorPosition: "BOTTOM_RIGHT",
      navigatorSizeRatio: 0.15,
      navigatorBorderColor: "hsl(280 80% 65%)",
      navigatorDisplayRegionColor: "hsl(280 80% 65% / 0.3)",
    });

    setViewer(osdViewer);

    return () => {
      osdViewer.destroy();
    };
  }, [imageUrl]);

  const handleZoomIn = () => {
    viewer?.viewport.zoomBy(1.5);
  };

  const handleZoomOut = () => {
    viewer?.viewport.zoomBy(0.67);
  };

  const handleHome = () => {
    viewer?.viewport.goHome();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!imageUrl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">No image selected</p>
          <Button onClick={() => navigate("/upload")}>
            Upload an Image
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <Home className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Deep Zoom Viewer</h1>
            <p className="text-sm text-muted-foreground">
              Scroll to zoom • Drag to pan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleHome}
            title="Reset View"
          >
            <Download className="w-5 h-5 rotate-180" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={toggleFullscreen}
            title="Fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Viewer */}
      <div className="flex-1 relative">
        <div
          ref={viewerRef}
          className="absolute inset-0"
          style={{
            background: 'hsl(var(--background))',
          }}
        />
        
        {/* Loading overlay */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
            />
            <p className="text-lg text-muted-foreground">
              Loading deep zoom tiles...
            </p>
          </div>
        </motion.div>
      </div>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/30 shadow-glow"
      >
        <p className="text-sm text-muted-foreground">
          💡 Try zooming in to see infinite detail
        </p>
      </motion.div>
    </div>
  );
};

export default Viewer;
