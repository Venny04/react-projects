const isAdmin = (req, res) => {
    if (req.user && req.user.role === 'admin') {
        return true;
    } else {
        return false
    }
    // && req.user.cargo === 'admin'
};

export { isAdmin };