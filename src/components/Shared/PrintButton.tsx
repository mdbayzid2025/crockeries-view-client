
const App = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      fontFamily: 'Inter, sans-serif',
    }}>
      <PrintButton />
    </div>
  );
};

const PrintButton = () => {

  return (
    <>
      <style>
        {`
        @keyframes pulse-print {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .print-icon-animated:hover {
          animation: pulse-print 1s infinite;
        }
        `}
      </style>

      <button        
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 28px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
          fontFamily: 'Inter, sans-serif',
          outline: 'none',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#45a049';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#4CAF50';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        }}
      >
        <svg
          className="print-icon-animated"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{
            width: '24px',
            height: '24px',
            transition: 'transform 0.2s ease',
          }}
        >
          <path d="M6 3H18V7H6zM19 12H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM17 19H7v-3h10v3zM18 10H6V3h12v7zM16 13h-3V9h-2v4H8l4 4 4-4z"/>
        </svg>
        Print Document
      </button>
    </>
  );
};

export default App;
