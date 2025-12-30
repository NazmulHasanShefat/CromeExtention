// ১. প্রথমে localStorage থেকে ডেটাটি নিয়ে আসুন
let storedData = localStorage.getItem('users');

if (storedData) {
    // ২. স্ট্রিং ডেটাকে জাভাস্ক্রিপ্ট অ্যারেতে রূপান্তর করুন (Parsing)
    let usersArray = JSON.parse(storedData);

    // ৩. ২ নম্বর ইনডেক্সের ভ্যালু আপডেট বা রি-অ্যাসাইন করুন
    // ধরুন আপনি পুরো অবজেক্টটি পরিবর্তন করতে চান
    usersArray[2] = { id: 103, name: 'Updated Name', role: 'Admin' };

    // ৪. আপডেট হওয়া অ্যারেটিকে পুনরায় স্ট্রিংয়ে রূপান্তর করুন
    let updatedData = JSON.stringify(usersArray);

    // ৫. পুনরায় localStorage-এ সেভ করে দিন
    localStorage.setItem('users', updatedData);

    console.log("২ নম্বর ইনডেক্স সফলভাবে আপডেট হয়েছে!");
} else {
    console.log("localStorage-এ 'users' নামে কোনো ডেটা নেই।");
}