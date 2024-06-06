async function postToMastodon() {
    const content = document.getElementById('statusContent').value;
    const accessToken = 'RcOn3COmNK56tUXakanY1WSUo-AgagUdOKeSQqQEhRU'; // 

    if (!content) {
        alert('Please enter some content to post.');
            return;
        }

    try {
        const response = await fetch('https://mastodon.social/api/v1/statuses', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: content })
        });

        if (response.ok) {
            alert('Post successful!');
            document.getElementById('statusContent').value = '';  // 清空输入框
        } else {
            const errorText = await response.text();
            console.error('Failed to post. Error:', errorText);
            alert('Failed to post. Error: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}