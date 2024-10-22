

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-green-500">
            <div className="w-80 bg-white rounded-lg shadow-lg">
                <div className="bg-red-600 rounded-t-lg p-5 text-center">
                    <h3 className="text-white text-2xl">Page not Found</h3>
                </div>
                <div className="p-6 text-center">
                    <h1 className="bg-red-600 text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto text-4xl">404</h1>
                </div>
                <div className="flex justify-between p-4">
                    <a href="/admin-layout" className="w-1/2 bg-teal-600 text-white text-center py-2 rounded-l-lg">Home</a>
                    <a href="/admin-layout" className="w-1/2 bg-teal-600 text-white text-center py-2 rounded-r-lg">Contact</a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
