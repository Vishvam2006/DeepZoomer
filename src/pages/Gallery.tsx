import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroNebula from "@/assets/hero-nebula.jpg";

const Gallery = () => {
  const navigate = useNavigate();

  // Demo images (in a real app, this would come from a database)
  const demoImages = [
    {
      id: 1,
      name: "Cosmic Nebula",
      thumbnail: heroNebula,
      size: "12.4 MB",
      uploadedAt: "2 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-nebula opacity-30" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4"
            >
              ← Back to Home
            </Button>
            
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Your Gallery
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage and explore your uploaded images
            </p>
          </div>

          <Button
            variant="default"
            onClick={() => navigate("/upload")}
            className="shadow-glow"
          >
            <Upload className="mr-2" />
            Upload New Image
          </Button>
        </motion.div>

        {demoImages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <ImageIcon className="w-24 h-24 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-semibold mb-4">No images yet</h2>
            <p className="text-muted-foreground mb-8">
              Upload your first image to start exploring infinite detail
            </p>
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate("/upload")}
            >
              <Upload className="mr-2" />
              Upload Your First Image
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-cosmic cursor-pointer"
                onClick={() => navigate(`/viewer?image=${encodeURIComponent(image.thumbnail)}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={image.thumbnail}
                    alt={image.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm"
                  >
                    <div className="bg-primary rounded-full p-4 shadow-glow">
                      <ZoomIn className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{image.name}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{image.size}</span>
                    <span>{image.uploadedAt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
