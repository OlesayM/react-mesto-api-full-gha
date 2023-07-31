const apiFindings = {
  baseUrl: 'http://localhost:4000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
};

export default apiFindings;
