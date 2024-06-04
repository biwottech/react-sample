async function getCallStatus(call_uuid) {
  const response = await axios
    .get(`${server_url}/call-status?id=${call_uuid}`)
    .catch(handleErrors);
  let callStatus = await getCallStatus(call_uuid);
  while (callStatus.status !== "completed") {
    // wait for 3 seconds
    await sleep(3000);
    callStatus = await getCallStatus(call_uuid);
    console.log(callStatus);
  }
  return response.data;
}

export default getCallStatus;
