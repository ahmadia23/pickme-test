import { myGif } from '../types/gifs';



export const ErrorResponse = () => {
  throw new Error("Something went wrong");
};

export const updateMyGifs = async (response: Response) => {
  const resData = await response.json();
  const updatedMyGifs:{gif: myGif}[] = [];
  for (let node in resData) {
    updatedMyGifs.push(resData[node]);
  }
  return updatedMyGifs;
};

export const fetchPostSaving = async (gifId: string, gifUrl:string ) => {
  const response = await fetch(
    `https://pickme-68b1a-default-rtdb.firebaseio.com/gifs/${gifId}.json`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        gifUrl: gifUrl,
        theme: "",
        id: gifId,
      }),
    }
  );
  return response;
};

export const fetchMyGifs = async () => {
  const response = await fetch(
    `https://pickme-68b1a-default-rtdb.firebaseio.com/gifs.json`
  );
  if (!response.ok) {
    ErrorResponse();
  } else {
    const updatedMyGifs = await updateMyGifs(response);
    return updatedMyGifs;
  }
};
