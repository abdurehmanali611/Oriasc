const Spinner = () => {
  return (
    <div
      id="spinner"
      className="opacity-0 invisible w-full h-screen bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-99999 transition-[opacity_0.8s_ease-out,visibility_0s_linear_0.5s]"
    >
      <div
        className="w-16 h-16 border-8 border-[#F1C152] border-t-transparent rounded-full animate-spin"
        role="status"
      ></div>
    </div>
  );
};

export default Spinner;
