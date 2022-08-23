export type serum_cpi_example ={
  "version": "0.1.0",
  "name": "serum_cpi",
  "instructions": [
    {
      "name": "initializeMarket",
      "accounts": [
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "serumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "baseLotSize",
          "type": "u64"
        },
        {
          "name": "quoteLotSize",
          "type": "u64"
        },
        {
          "name": "quoteDustThreshold",
          "type": "u64"
        },
        {
          "name": "valutSignerNonce",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transferTokens",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tempBaseTokenAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tempQuoteTokenAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "senderBaseTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "senderQuoteTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "baseTokenAmount",
          "type": "u64"
        },
        {
          "name": "quoteTokenAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "metadata": {
    "address": "HrcTxLg9VgssWFr28GFsE2uQUN212B5p48hGTgA1RG9u"
  }
}
  export const IDL: serum_cpi_example ={
    "version": "0.1.0",
    "name": "serum_cpi",
    "instructions": [
      {
        "name": "initializeMarket",
        "accounts": [
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "serumProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "marketId",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "requestQueue",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "eventQueue",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "bids",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "asks",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "baseVault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "quoteVault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "baseMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "quoteMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "baseLotSize",
            "type": "u64"
          },
          {
            "name": "quoteLotSize",
            "type": "u64"
          },
          {
            "name": "quoteDustThreshold",
            "type": "u64"
          },
          {
            "name": "valutSignerNonce",
            "type": "u64"
          }
        ]
      },
      {
        "name": "transferTokens",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "baseMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "quoteMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tempBaseTokenAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "tempQuoteTokenAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "senderBaseTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "senderQuoteTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "baseTokenAmount",
            "type": "u64"
          },
          {
            "name": "quoteTokenAmount",
            "type": "u64"
          }
        ]
      }
    ],
    "metadata": {
      "address": "HrcTxLg9VgssWFr28GFsE2uQUN212B5p48hGTgA1RG9u"
    }
  }