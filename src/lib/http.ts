import * as https from 'https';

export function httpRequest(options: https.RequestOptions, body?: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let response: string = '';
    const req = https.request(
      options,
      (res) => {
        res.on('data', (d) => {
          response += d.toString();
        });
    
        res.on('end', () => {
          resolve(response);
        });
      }
    );
    
    req.on('error', error => {
      reject(error);
    });

    if (body) {
      req.write(body);
    }
    
    req.end();
  });

  
}
