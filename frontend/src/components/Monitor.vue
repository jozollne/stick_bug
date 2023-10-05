<template>
  <div>
    <h1>DHCP & DNS  Leases - Monitoring</h1>
    <v-list v-if="leases">
      <v-list-item-group v-for="lease in leases" :key="lease.ip">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ lease.timestamp }} - {{ lease.ip }} - {{ lease.mac }} - {{ lease.hostname }} - {{ countdowns[lease.ip] }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-btn @click="fetchLeases" block>Drücken um Leases zu aktualisieren</v-btn> <!-- Der Button -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      leases: null,
      countdowns: {}  // Speichert die verbleibende Zeit für jeden Lease
    };
  },

  created() {
  setInterval(this.updateCountdowns, 1000);
  this.fetchLeases();  // Rufen Sie fetchLeases direkt hier auf, anstatt den Axios-Aufruf zu wiederholen
},

  methods: {
    playSound() {
      const audio = new Audio('/pew_pew-dknight556-1379997159.mp3'); // Ersetzen Sie 'path_to_your_mp3_file.mp3' durch den tatsächlichen Pfad zu Ihrer MP3-Datei
      audio.play();
    },

    fetchLeases() { // Die Methode zum Abrufen der Leases
      this.playSound(); // Spielt den Ton ab
      axios.get('http://192.168.10.254:3000/dnsmasq/leases').then(response => {
        this.leases = response.data;
      }).catch(error => {
        console.error("Error fetching DHCP leases:", error);
      });
    },

    convertToTimestamp(dateString) {
    // Beispiel-Input: "05.10.2023, 13:22:59"
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('.');
    const [hour, minute, second] = timePart.split(':');
    const dateObj = new Date(year, month - 1, day, hour, minute, second);
    return dateObj.getTime() / 1000;  // Rückgabe als Unix-Timestamp in Sekunden
  },

  updateCountdowns() {
    if (!this.leases) return;  // Wenn leases noch nicht geladen ist, brechen Sie ab

    const now = Date.now();
    this.leases.forEach(lease => {
      // Umwandlung von lease.timestamp in einen Unix-Timestamp (wenn es ein String ist)
      const timestamp = (typeof lease.timestamp === 'string') ? this.convertToTimestamp(lease.timestamp) : lease.timestamp;

      if (!timestamp || isNaN(timestamp)) {
        this.countdowns[lease.ip] = 'Ungültiger Timestamp';
        return;
      }

      const elapsedTime = now - timestamp * 1000;
      const remainingTime = 3 * 60 * 60 * 1000 - elapsedTime;

      // Umwandlung der verbleibenden Zeit in ein lesbares Format, z. B. "2h 30m"
      const hours = Math.floor(remainingTime / (60 * 60 * 1000));
      const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      this.countdowns[lease.ip] = `${hours}h ${minutes}m`;
    });
  }

  }
};
</script>
