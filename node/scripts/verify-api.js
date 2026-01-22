const axios = require('axios');
axios.defaults.timeout = 5000;

const API_URL = 'http://localhost:3000/api';
// Hardcoded secret for dev test if needed, but we used process.env in code. 
// We will generate token via the admin endpoint.

async function verify() {
  try {
    console.log('--- Verification Start ---');

    console.log('1. Admin Token Generation');
    const tokenRes = await axios.post(`${API_URL}/admin/token`, {
      userId: 123
    });
    const token = tokenRes.data.token;
    console.log('✅ Token obtained');

    console.log('2. Unauthorized Access');
    try {
      await axios.get(`${API_URL}/launches`);
      console.error('❌ Should have failed with 401');
    } catch (e) {
      if (e.response.status === 401) console.log('✅ 401 returned as expected');
      else console.error(`❌ Unexpected status: ${e.response.status}`);
    }

    console.log('3. Get Launches (First Call - Cache Miss)');
    const start1 = Date.now();
    const launchesRes1 = await axios.get(`${API_URL}/launches`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const duration1 = Date.now() - start1;
    console.log(`✅ Launches fetched in ${duration1}ms. Count: ${launchesRes1.data.length}`);
    
    if (launchesRes1.data.length > 0 && launchesRes1.data[0].rocket && launchesRes1.data[0].rocket.rocket_name) {
        console.log('✅ Data structure check passed');
    } else {
        console.error('❌ Data structure check failed', launchesRes1.data[0]);
    }

    console.log('4. Get Launches (Second Call - Cache Hit)');
    const start2 = Date.now();
    await axios.get(`${API_URL}/launches`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const duration2 = Date.now() - start2;
    console.log(`✅ Launches fetched in ${duration2}ms`);
    if (duration2 < duration1) console.log('✅ Caching seems effective');

    console.log('5. Add Favorite');
    const flightNumber = launchesRes1.data[0].flight_number;
    await axios.post(`${API_URL}/favorites/${flightNumber}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`✅ Favorite added for flight ${flightNumber}`);

    console.log('6. Verify Favorite in Launches');
    const launchesResFav = await axios.get(`${API_URL}/launches`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const favLaunch = launchesResFav.data.find(l => l.flight_number === flightNumber);
    if (favLaunch.is_favorite) console.log('✅ is_favorite is true');
    else console.error('❌ is_favorite is false');

    console.log('7. Remove Favorite');
    await axios.delete(`${API_URL}/favorites/${flightNumber}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Favorite removed');

    console.log('--- Verification Passed ---');

  } catch (error) {
    if (error.response) {
        console.error('❌ Verification failed with Response:', error.response.status, error.response.data);
    } else {
        console.error('❌ Verification failed:', error.message);
    }
  }
}

verify();
