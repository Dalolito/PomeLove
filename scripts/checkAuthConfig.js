require('dotenv').config({ path: '.env' });

console.log('🔍 Verificando configuración de autenticación...\n');

const requiredVars = [
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD_HASH',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
];

let allGood = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName}: NO CONFIGURADO`);
    allGood = false;
  } else {
    console.log(`✅ ${varName}: ${varName.includes('SECRET') || varName.includes('HASH') ? '***CONFIGURADO***' : value}`);
  }
});

console.log('\n📋 Resumen:');
if (allGood) {
  console.log('✅ Todas las variables están configuradas correctamente');
} else {
  console.log('❌ Faltan algunas variables de entorno');
  console.log('\n💡 Asegúrate de agregar al archivo .env existente:');
  console.log('ADMIN_USERNAME=pumbis');
  console.log('ADMIN_PASSWORD_HASH=$2b$12$1ayaTQ5RqVcbGPsDQ0Ljze4fnU5je0t0.rLvHD0sLXwJwMHOttUpK');
  console.log('NEXTAUTH_SECRET=46d9c2521317aa1ce29e3dc6d55492a6741c6cc56819917106866937a41a0e05');
  console.log('NEXTAUTH_URL=http://localhost:3000');
}
