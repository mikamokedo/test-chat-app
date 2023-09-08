import React from "react";

export const useKeyPress = (targetKey:string) => {
    const [keyPressed, setKeyPressed] = React.useState(false);
  
    const downHandler = ({ key }:any) => {
      if (key === targetKey) setKeyPressed(true);
    };
  
    const upHandler = ({ key }:any) => {
      if (key === targetKey) setKeyPressed(false);
    };
  
    React.useEffect(() => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
  
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, []);
  
    return keyPressed;
  };