using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
 
public class Client : MonoBehaviour
{
    public List<int> motion_list = new List<int>();
    public List<string> ipaddress_list = new List<string>();
    public int motion_index = 0;
    public int ipaddress_index = 0;


    WebSocket ws;

    void Start()
    {
        ws = new WebSocket("ws://localhost:3000/");
 
        ws.OnOpen += (sender, e) =>
        {
            motion_list.Add(UnityEngine.Random.Range(0, 10));
            ws.Send(motion_list[motion_index].ToString());
            motion_index++;
            Debug.Log("ws connected");
        };
        ws.OnMessage += (sender, e) =>
        {
            Debug.Log("WebSocket Message Type: " + ", Data: " + e.Data);
        };

        ws.OnError += (sender, e) =>
        {
            Debug.Log("WebSocket Error Message: " + e.Message);
        };
 
        ws.OnClose += (sender, e) =>
        {
            Debug.Log("WebSocket Close");
        };

        ws.Connect();
 
    }
 
    void Update()
    {
 
        if (Input.GetKeyUp("s"))
        {
            Debug.Log("Pressed [S] key");
            ws.Send("Client Pressed [S] key");
        }
 
    }
 
    void OnDestroy()
    {
        ws.Close();
        ws = null;
    }
}