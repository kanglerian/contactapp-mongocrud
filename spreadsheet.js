const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1aRhgElq2PRST15y3OSSaWmfSpm8O97CsfNjURV_rYnc');

const app = async () => {
    await doc.useServiceAccountAuth({
      client_email: 'kanglerianaccesssheets@studious-saga-350007.iam.gserviceaccount.com',
      private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCXh7fRtDCQySnx\nBFyAPEOT5294saq8XHeOkSvWjCer5zUhdiLjCanaRW+s0OncMzRBZy97EtCPTX5S\n0AsBSSyhnaDclRyDq1VsgdKsutLzxw8tGGb/Dsi88uaYYoS1nPh2CUf9s3RKz22x\nGaGLTDUj9elZ0sJknCF9VyHiHJ8Eh274Wa9hHVE7seUZm+3TV1pc5+1Q8TIVxCHR\n5axjDkZprT7eWZqt/lIUSeZRPRw8lrLp6RaAXe7V0aFHrQDE4dqmuJya3zRf8pjs\nDCCaRtXR0IwRDrT07d3/vAk2c9Opn1kd9U0vxoGqe6e3MUr6RKwY1zY/GwD77bch\nUbKTOp9hAgMBAAECggEABHDN1leAvdl7VmzBi4uDPSQg5ulT/tRPN6PG+bEJSkHK\nvjngpgUm5QvjDNjheu/Fi1jLXNYNZnRdAZnHB3OzcGK2xQgZ+hItEnKP2o/YtfFX\n30MyD4L0JzS6Gm32rtN/D4clmjMmXbk29nlGZpc7jnElicRB/fdPtEU3q7vu0rqG\nyRnG7AlFVui6T2QFTznqPBReRzY9iX4MKSfREEpARTaJwah34wpdBkcc4TyL+OP6\nkjDsEGQxLWVd7MC00/u1wXP3V/XfApWeCZ19hRdGEiH3Ae/rR0ALqIXz/PesHP5p\nDazY4hskqq+bnVcCmUMzkzEavkd5CS+p3VygFJS2cQKBgQDIRb27A4vBCjmNHVBu\nzSfaiZHzrwX6jEgPMPyr7t1wBrCHY7VQrTjz7lkjYwnezu831waU3gohqBNfwBIt\nf2X+BWx7mSBnmKr/2DvvPjRQg5bagGvC9QjwDkUqoGgOiGw+ZAcvnK2ysJLTfknH\n6A+9xPrtgui2WOLlSYOS/yEvSQKBgQDBsdtMh8CWd6PKR4n+tT8zI3E1Ql4audNK\n4meF41N/I+MvIK79rjq2W68BPiQmaQ0Q7YTvIwVQ8CI/3qwFOEhj2ywkv7E67b1p\nncoy52boJ5lYidZVlIGELWMHj+HLU+/GLIUKJ0VFDU+5bSCdK9kMFpxYdP1BKbr1\nm0TzVMS3WQKBgQChPJzK4sjySqQY+1/VRPBwHk/WK7QZijU9ncffOHkpBwm6hsjk\nQgHXSa6UMdkxe9LWVxSiZ70qaaHndcBsxuO7RmyXeanAHgaV4mYmcCM4KykZk0iu\n9g4TDroa3nfIM4dKF8g9SdwCP+yFv2fxPODnfJ40+C8ZF6jcxnnar/LsmQKBgQC+\nuXcLAJEumFf7kj3bRHUa0cdjfhpTjq7zicQOHi3Vf2zwtuoYeTru3ZCRVLMb700i\nYf8HyiAt9oaDBau06Bq/2My60tadBAQCv5CeVyUJbBSfDfqzAiwWDur4Q0E+iUQM\ni0HlIY4f1F+wYjg/CzIJqSoCIBBP3dtuhJl8UPfy4QKBgEHB8DIYfpAqzjFdLyS2\n5slIKUDR0tv9vuDloX5HdHsymnXL/fYJ2BvTFhIeFrYjFnsikq4obx8o1C6yvi6E\nuiFQoxAHm/RnP6C5fHpWE51x9/w+eUCKIbh0Ga6ZGxOaVc5bkfAEmf80AID7rbMQ\njpEBJ4FvUAueEJ+72VKLdEBL\n-----END PRIVATE KEY-----\n',
    });
    
    const sheet = doc.sheetsByIndex[0];
    const jumlah = sheet.rowCount;
    await sheet.loadCells(`A2:E${jumlah}`);
    
    for(var i = 2; i <= jumlah; i++){
    console.log(`Tugasku adalah ${sheet.getCellByA1(`B${i}`).value} yang dimandatkan dari ${sheet.getCellByA1(`C${i}`).value}`);
    };
}

app();