import hbs from 'handlebars';

/**
 * Use Handlebars.safeString internal helper to stringify a JSON object.
 *
 * @example console.log(JSON.stringify({{[../helpers/toJSON] someJSON}}, null, 2));
 *
 * @param object JSON object
 * @param options JSON.stringify options parameter
 * @param indent JSON.stringify indent parameter (use it to print readable JSON)
 * @returns {*}
 */
export default (object, options = null, indent = null) => {
  return new hbs.SafeString(JSON.stringify(object, options, indent));
};