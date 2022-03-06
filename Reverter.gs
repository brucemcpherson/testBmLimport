const reverter = () => {

  // create an instance
   const limporter = bmLimporter.newLimporter({
    tokenService: ScriptApp.getOAuthToken,
    fetcher: UrlFetchApp.fetch,
    cacheStore: CacheService.getUserCache()
  })
  
  // we'll need this later
  const {sapi} = limporter

  // this is the scriptId of the input project that needs its libraries inlined
  // it's my inlined project
  const inlinedId = '1fBU_YHk4LpQbuPqYOLlRXsqlP_ECgHAYVdbDa9oPhgwwnTaD0uBwHMRN'

  // this is where to write the inlined project - it could be the same as the input scriptId
  const revertedId = '1fBU_YHk4LpQbuPqYOLlRXsqlP_ECgHAYVdbDa9oPhgwwnTaD0uBwHMRN'
  console.log('reverting to ', revertedId)
  
  /*
   * inline the files
   * this example will upgrade all libraries to use latest deployed versions
   * also turning off caching - just in case any of the underlying libraries have been redeployed since the last time I ran this - usually not necessary
   */
  const files = limporter.revert({ 
    scriptId:inlinedId , 
    noCache: true
   })


  /*
   * write the files to the new project
   * first clearing out any files that are there for a fresh start
   */
  sapi.addFiles({
    scriptId: revertedId,
    clear: true,
    files
  }).throw()

}
