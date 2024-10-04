const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { mplTokenMetadata } = require('@metaplex-foundation/mpl-token-metadata');
const { Keypair, Connection, clusterApiUrl } = require('@solana/web3.js');

(async () => {
  const connection = new Connection(clusterApiUrl('mainnet-beta'));
  const wallet = Keypair.fromSecretKey(Uint8Array.from([125,59,137,24,123,125,199,16,187,242,249,48,89,236,110,230,13,199,82,19,48,9,66,85,27,219,13,49,163,246,143,229,255,102,28,235,222,107,213,141,205,32,96,198,18,161,129,246,65,194,113,145,81,31,6,18,161,114,221,148,93,186,111,148]));
  const umi = createUmi(connection).use(mplTokenMetadata()).use(wallet);

  const metadata = {
    name: 'SuperPuggs',
    symbol: 'SPuggs',
    uri: 'https://raw.githubusercontent.com/SuperPuggs/metadata.json/refs/heads/main/metadata.json',
    sellerFeeBasisPoints: 300,
    creators: [
      {
        address: 'B1Pt8zB89MRHz8gbqfzPiQJvjryfWwGhPKhoETtzTTXz',
        share: 100,
      },
    ],
    image: 'https://raw.githubusercontent.com/SuperPuggs/crypto/refs/heads/main/logo.png',
    description: 'SuperPuggs! We are a vibrant and passionate community that brings together gamers and cryptocurrency enthusiasts, with a special love for animals, especially adorable Pugs. Here, we seek a space where friendship, fun, and growth go hand in hand.',
    external_url: 'https://www.superpuggs.com',
    attributes: [
      {
        trait_type: 'Category',
        value: 'Meme Coin',
      },
      {
        trait_type: 'Community',
        value: 'Gamers and Crypto Enthusiasts',
      },
    ],
    collection: {
      name: 'SuperPuggs Collection',
      family: 'SuperPuggs',
    },
    properties: {
      files: [
        {
          uri: 'https://raw.githubusercontent.com/SuperPuggs/crypto/refs/heads/main/logo.png',
          type: 'image/png',
        },
      ],
      category: 'image',
    },
  };

  const mint = Keypair.generate();
  await umi.mplTokenMetadata.createMetadata({
    mint,
    metadata,
  });

  console.log('Metadata criada com sucesso para o token:', mint.publicKey.toBase58());
})();