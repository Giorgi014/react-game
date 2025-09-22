import { useAtom, useAtomValue } from "jotai";
import { isTextBoxVisibleAtom, textBoxContentAtom } from "../store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./TextBox.css";

const variants = {
  open: { pacity: 1, scale: 1 },
  closed: { pacity: 0, scale: 0.5 },
};

export default function TextBox() {
  const [isVisible, setIsVisible] = useAtom(isTextBoxVisibleAtom);
  const [isCloseRequest, setIsCloseRequest] = useState(false);
  const content = useAtomValue(textBoxContentAtom);

  const handleAnimationComplete = () => {
    if (isCloseRequest) {
      setIsVisible(false);
      setIsCloseRequest(false);
    }
  };

  useEffect(() => {
    const closeHandler = (e) => {
      if (!isVisible) return;
      if (e.code === "Space") {
        setIsCloseRequest(true);
      }
    };
    window.addEventListener("keydown", closeHandler);

    return () => {
      window.removeEventListener("keydown", closeHandler);
    };
  }, [isVisible]);

  return (
    isVisible && (
      <motion.div
        className="text-box"
        initial={{ pacity: 0, scale: 0.5 }}
        animate={isCloseRequest ? "closed" : "open"}
        variants={variants}
        transition={{ duration: 0.2 }}
        onAnimationComplete={handleAnimationComplete}
      >
        <p>{content}</p>
      </motion.div>
    )
  );
}
