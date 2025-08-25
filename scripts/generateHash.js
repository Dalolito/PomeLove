const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'CataPerros123';
  const hash = await bcrypt.hash(password, 12);
  console.log('ADMIN_PASSWORD_HASH=' + hash);
}

generateHash();
