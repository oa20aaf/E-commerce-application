export const Preloader = () => {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-white z-50"
        id="preloader"
      >
        <div className="text-4xl font-bold flex space-x-2 text-blue-600">
          <span className="animate-bounce delay-75">A</span>
          <span className="animate-bounce delay-100">f</span>
          <span className="animate-bounce delay-150">r</span>
          <span className="animate-bounce delay-200">o</span>
          <span className="w-2"></span>
          <span className="animate-bounce delay-250">S</span>
          <span className="animate-bounce delay-300">h</span>
          <span className="animate-bounce delay-350">o</span>
          <span className="animate-bounce delay-400">p</span>
        </div>
      </div>
    );
  };
  