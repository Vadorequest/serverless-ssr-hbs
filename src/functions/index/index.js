import { failure } from "../../utils/browserResponse";

// XXX Load the file (webpacked) and compiles it with partials/helpers, returns an actual HBS template.
// See https://github.com/pcardune/handlebars-loader
import template from './index.hbs';

/**
 * Returns a HTML output, based on a Handlebars template (SSR)
 *
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<void>}
 */
export async function handler(event, context, callback) {
  try {
    const data = {
      _html: {
        lang: 'en'
      },
      title: 'Hello world!',
      message: 'Hello world!',
      env: process.env.NODE_ENV,
      someJSON: { // Randomly taken from http://json.org/example.html
        "glossary": {
          "title": "example glossary",
          "GlossDiv": {
            "title": "S",
            "GlossList": {
              "GlossEntry": {
                "ID": "SGML",
                "SortAs": "SGML",
                "GlossTerm": "Standard Generalized Markup Language",
                "Acronym": "SGML",
                "Abbrev": "ISO 8879:1986",
                "GlossDef": {
                  "para": "A meta-markup language, used to create markup languages such as DocBook.",
                  "GlossSeeAlso": ["GML", "XML"]
                },
                "GlossSee": "markup"
              }
            }
          }
        }
      }
    };

    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: template(data) //
    });

  } catch (e) {
    callback(null, failure({ status: false }, e));
  }
}
