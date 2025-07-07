const EmailForm = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <label className="block text-white mb-2 text-sm font-medium">Get Updates</label>
            <div className="flex items-center bg-white rounded-full px-2 py-1">
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="flex-1 bg-transparent outline-none px-4 py-2 text-gray-700 placeholder-gray-400 rounded-full"
                />
                <button
                    type="submit"
                    className="bg-gray-900 text-white px-4 py-2 rounded-3xl hover:scale-101 duration-300 hover:bg-gray-700 transition-colors duration-300 cursor-pointer active:bg-gray-900 duration-300"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default EmailForm;