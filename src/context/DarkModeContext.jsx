import { createContext, useState, useContext, useEffect } from "react";
const DarkModeContext = createContext();

//다크모드 provider생성, 인자로는 자식 노드
export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  //로드 되었을때 다크모드인지 아닌지 isDark에 저장함
  //localStorage theme이 dark이거나 localStorage theme이 없지만 window의 dark모드를 쓴다고 되어 있다면
  useEffect(() => {
    //프로바이더가 처음 mount되었을때 불림 -> 그게 언제냐면 app.js에서 있으니 어플리케이션이 실행될때 딱 한번 불림
    const isDark = (localStorage.theme =
      "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));
    setDarkMode(isDark); //리액트 내부 state에 업데이트
    updateDarkMode(isDark); //dark 클래스 넣는 함수
  }, []);
  //provider를 이용해 자식 노드를 감싸기
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}
export const useDarkMode = () => useContext(DarkModeContext);
