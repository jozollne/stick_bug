import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';

@Injectable()
export class DnsmasqService {
    async getLeases(): Promise<any[]> {
        const data = await fs.readFile('/var/lib/misc/dnsmasq.leases', 'utf8');
        
        const leases = data.split('\n').filter(line => line).map(line => {
            const parts = line.split(' ');
            
            // Umwandeln des Unix-Timestamps in ein Datum
            const date = new Date((parseInt(parts[0]) * 1000) - 3600000);  // Subtraktion von 3600000 Millisekunden (1 Stunde)

            // Formatieren des Datums in UTC
            const formattedDate = new Intl.DateTimeFormat('de-DE', {
                timeZone: 'Europe/Berlin',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(date);
            
    
            return {
                timestamp: formattedDate,
                mac: parts[1],
                ip: parts[2],
                hostname: parts[3]
            };
        });
    
        return leases;
    }
    
}
