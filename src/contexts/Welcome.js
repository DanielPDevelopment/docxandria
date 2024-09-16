import Logtastic from '@ofrepose/logtastic';

export function helloWorld(){
    // Clear the console to provide a clean output
    console.clear();
    
    // Log welcome messages
    Logtastic.log(`👋 Welcome to doc-xandria - I hope you find this application useful.`, {color: 'blue'});
    Logtastic.log(`📢 If you have any questions or want to collab on something feel free to reach out to me https://www.linkedin.com/in/danielfpayne/ `, {color: 'green'});
}
