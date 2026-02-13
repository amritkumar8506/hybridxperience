function SimpleLiquidBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 40%),
            linear-gradient(to bottom, #000000 0%, #0a0a0a 100%)
          `,
          animation: 'gradient-shift 15s ease infinite',
        }}
      />
      
      {/* Animated blobs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%)',
          animation: 'float-1 20s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
          animation: 'float-2 18s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full blur-[100px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)',
          animation: 'float-3 22s ease-in-out infinite',
        }}
      />
    </div>
  );
}

export default SimpleLiquidBackground;