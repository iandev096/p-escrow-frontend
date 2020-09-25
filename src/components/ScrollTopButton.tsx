import React, { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/core";
import { FiArrowUp } from "react-icons/fi";
import { throttle } from "../utilities/throttle";

interface ScrollTopButtonProps {}

export const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({}) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollOffset = 50;

  useEffect(function mount() {
    function onScroll() {
      if (!showScrollButton && window.pageYOffset > scrollOffset) {
        setShowScrollButton(true);
      } else if (showScrollButton && window.pageYOffset <= scrollOffset) {
        setShowScrollButton(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return function unMount() {
      window.removeEventListener("scroll", onScroll);
    };
  });


  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showScrollButton && (
        <IconButton
          onClick={() => scrollTop()}
          variantColor="blue"
          icon={FiArrowUp}
          aria-label="Scroll to Top"
          position="fixed"
          bottom={["1rem", "1.5rem", "2rem"]}
          right={["1rem", "1.5rem", "2rem"]}
          opacity={0.6}
          _active={{ opacity: 0.9 }}
          _hover={{ opacity: 0.8 }}
        />
      )}
    </>
  );
};
