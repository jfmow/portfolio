/**
 * Strava → Portfolio proxy  (Cloudflare Worker)
 * --------------------------------------------------------------
 * Holds your secret + refresh token server-side, mints a fresh
 * access token on each request, and returns clean JSON for the
 * portfolio's live card. Free tier is plenty.
 *
 * DEPLOY (Cloudflare):
 *   1. dash.cloudflare.com → Workers & Pages → Create → Worker
 *   2. Paste this file, Deploy.
 *   3. Settings → Variables and Secrets → add THREE secrets:
 *        STRAVA_CLIENT_ID      = 99389
 *        STRAVA_CLIENT_SECRET  = <your NEW secret after rotating>
 *        STRAVA_REFRESH_TOKEN  = <your NEW refresh token>
 *   4. Copy the worker URL (e.g. https://strava-proxy.you.workers.dev)
 *   5. Paste it into STRAVA_ENDPOINT in Portfolio.html.
 *
 * NOTE: your current scope is "read" (public activities + totals).
 * For private activities / heart-rate on the latest ride, re-auth
 * with scope "activity:read_all".
 */
export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300', // cache 5 min — be nice to rate limits
    };
    try {
      // 1) refresh the access token
      const tok = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: env.STRAVA_CLIENT_ID,
          client_secret: env.STRAVA_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: env.STRAVA_REFRESH_TOKEN,
        }),
      }).then(r => r.json());

      const auth = { Authorization: `Bearer ${tok.access_token}` };

      // 2) athlete + season totals + latest activity
      const athlete = await fetch('https://www.strava.com/api/v3/athlete', { headers: auth }).then(r => r.json());
      const stats   = await fetch(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`, { headers: auth }).then(r => r.json());
      const acts    = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=1', { headers: auth }).then(r => r.json());

      const ride = stats.ytd_ride_totals || {};
      const a = Array.isArray(acts) ? acts[0] : null;

      const body = {
        name: `${athlete.firstname} ${athlete.lastname}`.trim(),
        ytd_km:   Math.round((ride.distance || 0) / 1000),
        ytd_elev: Math.round(ride.elevation_gain || 0),
        count:    (stats.all_ride_totals && stats.all_ride_totals.count) || 0,
        latest: a ? {
          name: a.name,
          where: a.location_city || a.timezone?.split('/').pop()?.replace('_', ' ') || '',
          dist_km: (a.distance / 1000).toFixed(1),
          moving_s: a.moving_time,
          speed: a.average_speed ? (a.average_speed * 3.6).toFixed(1) : null, // m/s → km/h
          hr: a.average_heartrate ? Math.round(a.average_heartrate) : null,
        } : null,
      };

      return new Response(JSON.stringify(body), { headers: cors });
    } catch (err) {
      return new Response(JSON.stringify({ error: String(err) }), { status: 502, headers: cors });
    }
  },
};
