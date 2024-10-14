const toggleStatus = (e: any) => {
    setBlockUserStatus(blockUnblockUser)

    setState((prevStatus: any) => !prevStatus);
    if(blockUnblockUser != null) {
      axios.get(`https://project-spotify-1.onrender.com/users/${blockUnblockUser}`, {headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },})
      .then((r) => {
        // setUserInfo(() => {r.data.id, r.data.isBlocked})
        // totalUsers.push(r.data.id, r.data.isBlocked)
        
        setUserInfo(r.data.isBlocked)
        console.log(userInfo)
        // console.log(r)
        
      })
      .catch((res) => {
        console.log(res)
      })
    }
    
  // setUserStatus(users[0].active)
  // setUserInfo({blockUnblockUser: userStatus});
}