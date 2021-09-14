import { useCallback, useEffect, useState } from "react";
import * as S from "./style";

function App() {
  const [isAccessible, setIsAccessible] = useState();

  const onChange = useCallback(async (e) => {
    const res = await window.api.accessToFile(e.target.files[0].path);
    
    setIsAccessible(res);
  }, []);
  
  useEffect(() => {
    window.api.getWindowId().then((res) => console.log(res));
  }, []);

  return (
    <S.App>
      <input type="file" onChange={onChange}/>
      <div>{isAccessible === undefined ? "🤔" : isAccessible ? "🙆🏻" : "🙅🏻"}</div>
    </S.App>
  );
}

export default App;
