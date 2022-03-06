const converter = () => {

  // create an instance
   const limporter = bmLimporter.newLimporter({
    tokenService: ScriptApp.getOAuthToken,
    fetcher: UrlFetchApp.fetch,
    cacheStore: CacheService.getUserCache()
  })
  
  // we'll need this later
  const {sapi} = limporter

  // this is the scriptId of the input project that needs its libraries inlined
  // it's my gasgit project
  const scriptId = '1TphrUjRcx5sGlhgkfjB2R9MOZe3cPF7wK1LV8yVNoFCAwRTeNyXVsDFd'

  // this is where to write the inlined project - it could be the same as the input scriptId
  const newScriptId = scriptId // '1fBU_YHk4LpQbuPqYOLlRXsqlP_ECgHAYVdbDa9oPhgwwnTaD0uBwHMRN'

  /*
   * alternatively you could create a brand new project and use its id like this
   * const newProject = sapi.createProject ({title: 'my new project'}).throw()
   * const newScriptId = newProject.data.scriptId
   */

  console.log('writing to ', newScriptId)
  
  /*
   * inline the files
   * this example will upgrade all libraries to use latest deployed versions
   * also turning off caching - just in case any of the underlying libraries have been redeployed since the last time I ran this - usually not necessary
   */
  const files = limporter.getInlineProjectFiles({ 
    scriptId, 
    versionTreatment: 'sloppyupgrade',
    noCache: true
   })


  /*
   * write the files to the new project
   * first clearing out any files that are there for a fresh start
   */
  sapi.addFiles({
    scriptId: newScriptId,
    clear: true,
    files
  }).throw()

}
