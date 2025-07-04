import { useState } from "react";

function SaveModal(props) {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(props.todosUrl);
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy!');
            console.error('Error copying text: ', err);
        } finally {
            setTimeout(() => {
                setCopySuccess('');
            }, 2000);
        }
    };

    return (
        <>
            <div className="fixed overflow-y-auto top-0 w-full left-0 hidden" id="modal">
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 
                    pb-20 text-center sm:block sm:p-0">
                    <div className="-z-1 fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-900 opacity-85" />
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div className="inline-block align-center bg-white rounded-lg text-left 
                        overflow-hidden shadow-xl transform transition-all sm:my-8 
                        sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <label className="font-light text-gray-800 mt-2 mb-3">Use the link below to access your todo list:</label>
                            <input type="text" value={props.todosUrl} className="w-full outline-none 
                                font-extralight rounded bg-gray-100 p-2 mt-2 mb-3"readOnly />
                        </div>
                        <div className="flex bg-gray-200 px-4 py-3 text-right">
                            {copySuccess && <p className="py-2 px-4">{copySuccess}</p>}
                            <button className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 
                                mr-2 ml-auto" onClick={handleCopy}>Copy</button>
                            <button className="py-2 px-4 bg-blue-500 text-white rounded font-medium 
                                hover:bg-blue-700 mr-2 transition duration-500" onClick={props.toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaveModal