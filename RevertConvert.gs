const revertConvert = () => {

  // create an instance
   const limporter = bmLimporter.newLimporter({
    tokenService: ScriptApp.getOAuthToken,
    fetcher: UrlFetchApp.fetch,
    cacheStore: CacheService.getUserCache()
  })
  
  // we'll need this later
  const {sapi} = limporter

  // this is the scriptId of the input project that currently has imported libraries
  const inlinedId = '1Bq9cO6YpXnTXv0MGqQGAq2nuqAVWE9C8c_vqsYGJx7YSCmo2E3i4FJIC'

  // this is where to write the updated inlined project
  const updatedId = '1Bq9cO6YpXnTXv0MGqQGAq2nuqAVWE9C8c_vqsYGJx7YSCmo2E3i4FJIC'
  console.log('reverting',  inlinedId,' then updating to ', updatedId)
  
 
  /*
   * revert then refresh hthe library files
   * this example will upgrade all libraries to use latest deployed versions
   */
  const files = limporter.refreshInlineProjectFiles({ 
    scriptId:inlinedId, 
    versionTreatment: 'upgrade',
    noCache: true,
    exportClasses: true
   })

  /*
   * write the files to the new project
   * first clearing out any files that are there for a fresh start
   */
  sapi.addFiles({
    scriptId: updatedId,
    clear: true,
    files
  }).throw()

}

