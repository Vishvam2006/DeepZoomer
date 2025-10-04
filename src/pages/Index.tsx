import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, ZoomIn, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroNebula from "@/assets/hero-nebula.jpg";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 bg-gradient-nebula opacity-50" />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-16 h-16 text-primary" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            DeepZoomer
          </h1>
          
          <p className="text-2xl md:text-3xl text-foreground/80 mb-4 font-light">
            Upload your image. Zoom into infinity.
          </p>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover what your eyes can't see
          </p>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-cosmic border border-primary/20">
            <img
              src={heroNebula}
              alt="Cosmic nebula demonstration"
              className="w-full h-[400px] object-cover transition-transform duration-700"
              style={{ transform: isHovering ? 'scale(1.1)' : 'scale(1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovering ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-background/80 backdrop-blur-sm rounded-full p-6 shadow-glow">
                <ZoomIn className="w-12 h-12 text-primary animate-glow-pulse" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <Button
            variant="cosmic"
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => navigate("/upload")}
          >
            <Upload className="mr-2" />
            Upload Your Image
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 border-primary/30 hover:border-primary"
            onClick={() => navigate("/gallery")}
          >
            <ImageIcon className="mr-2" />
            View Gallery
          </Button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            {
              icon: ZoomIn,
              title: "Infinite Detail",
              description: "Zoom endlessly without losing quality. Every pixel stays crystal clear."
            },
            {
              icon: Sparkles,
              title: "Smart Processing",
              description: "Advanced tiling technology ensures smooth, seamless exploration."
            },
            {
              icon: ImageIcon,
              title: "Any Resolution",
              description: "Upload massive images and explore them like never before."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4 animate-float" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
