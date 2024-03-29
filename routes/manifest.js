'use strict'

module.exports = async function (fastify, opts) {

  const options = {
    schema: {
      query: {
        start_url: { type: 'string' },
        theme_color: { type: 'string' },
        name: { type: 'string' }
      }
    }
  }
  /**
   * Generates a manifest.json based on the parameters in the querystring:
   * town_id (to generate start_url), 
   * theme_color (theme_color)
   * name (name and short_name)
   */

   fastify.get('/pwa/manifest.json', options, async (request, reply) => {
    const { town_id, name, theme_color } = request.query;
    try {
      if (!name && !theme_color) {
        throw new Error('No parameters found');
      }  
      const templateParams = {
        town_id,
        theme_color,
        name,
      };
      reply.header('Content-Type', 'application/json; charset=utf-8') 
      return reply.view('/templates/pwa/manifest.ejs', templateParams)
    } catch (err) {
      // If error, sends the static manifest
      return reply.sendFile('manifest.json')
    }
  })
  

}
