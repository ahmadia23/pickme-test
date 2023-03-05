export const ErrorResponse = () => {
  throw new Error("Something went wrong");
};

export const updateMyGifs = async (response) => {
  const resData = await response.json();
  const updatedMyGifs = [];
  for (let node in resData) {
    updatedMyGifs.push(resData[node]);
  }
  return updatedMyGifs;
};

export const fetchPostSaving = async (gifId, gifUrl) => {
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
    ErrorResponse(response);
  } else {
    const updatedMyGifs = await updateMyGifs(response);
    return updatedMyGifs;
  }
};
