import React, { useEffect, useRef } from "react";

export const ListItem = ({ handleDelete, text }) => {
  const ref = useRef(null);

  useEffect(() => {
    const item = ref.current;

    return () => {
      switch (true) {
        case !!item?.nextElementSibling:
          (item?.nextElementSibling)?.focus();
          break;
        case !!item?.previousElementSibling:
          (item?.previousElementSibling)?.focus();
          break;
        default:
          (item?.parentElement)?.focus();
          break;
      }
    };
  }, []);

  return (
    <li ref={ref} tabIndex={-1}>
      {text} <button onClick={() => handleDelete(text)}>Delete</button>
    </li>
  );
};
