import User from "../models/user.model.js";


export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        await user.save();
        res.status(200).json({ message: "Profile updated", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
};