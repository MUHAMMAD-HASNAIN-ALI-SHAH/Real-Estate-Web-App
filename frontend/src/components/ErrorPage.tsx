export default function ErrorPage({ message = "Something went wrong." }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-50">
      <div className="bg-white p-6 rounded shadow-lg text-center text-red-600">
        <h1 className="text-2xl font-bold mb-2">Error</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
