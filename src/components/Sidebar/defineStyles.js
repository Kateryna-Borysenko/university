const defineStyles = (isOpen) => {
  const finalStyles = ["Sidebar"];

  if (!isOpen) {
    finalStyles.push("Sidebar-closed");
  }

  return finalStyles.join(" ");
};

export default defineStyles;
