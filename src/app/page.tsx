export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Página de prueba</h1>
        <p className="text-gray-600">Esta página debería redirigir automáticamente a /es</p>
        <p className="text-sm text-gray-500 mt-2">Si ves esto, el middleware no está funcionando</p>
      </div>
    </div>
  )
}
